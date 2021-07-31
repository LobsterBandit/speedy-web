/*global Buffer, process*/
import zlib from "zlib"

const border = `${Array(30).join("=")}\n`

const byteSizes = ["Bytes", "KB", "MB", "GB"]
function formatBytes(bytes) {
  if (bytes === 0) return "0 Byte"
  const k = 1000
  const dm = 3
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + byteSizes[i]
}

function percentChange(sizeNew = 0, sizeOld = 0) {
  const percent = Math.max(((1 - sizeNew / sizeOld) * 100).toFixed(2), 0)
  return Number.isNaN(percent) ? 0 : percent
}

function getModuleContents(source) {
  return Buffer.isBuffer(source)
    ? source
    : typeof source === "string"
    ? Buffer.from(source, "utf8")
    : Buffer.from(source)
}

function sizeOrCodeSize(size, code) {
  if (size || size === 0) return size
  return code ? Buffer.byteLength(code, "utf8") : 0
}

function calculateSizes(contents) {
  return {
    size: contents.byteLength,
    gzip: zlib.gzipSync(contents).byteLength,
    brotli: zlib.brotliCompressSync(contents).byteLength,
  }
}

function reportResults({ chunks, totalOrigSize, totalSize }, opts = {}) {
  const { limit = 5 } = opts
  console.log(
    `\n${border}rollup-plugin-bundle-stats\n${border}Bundle size: ${formatBytes(
      totalSize
    )} (\u2B07 ${percentChange(
      totalSize,
      totalOrigSize
    )}%)    Orig size: ${formatBytes(totalOrigSize)}`
  )
  Object.entries(chunks).forEach(
    ([id, { size, gzip, brotli, dependencies }]) => {
      // top-level chunks
      console.log(
        `* ${id} - size: ${formatBytes(size)} - gzip: ${formatBytes(
          gzip
        )} - brotli: ${formatBytes(brotli)} - dependencies: ${
          dependencies?.length ?? 0
        }`
      )

      if (!dependencies) {
        return
      }

      // sort by size desc
      dependencies.sort((a, b) => b.size - a.size)

      // print top
      for (let i = 0; i < limit; i++) {
        if (!dependencies[i]) {
          break
        }

        console.log(
          `    ${dependencies[i].id} - size: ${formatBytes(
            dependencies[i].size
          )} - orig: ${formatBytes(dependencies[i].origSize)} - dependencies: ${
            dependencies[i].dependencies.length
          }`
        )
      }
    }
  )
}

export function rollupPluginBundleStats(opts = {}) {
  const root = process?.cwd() ?? null

  const parseId = (id) => {
    return id.replace(/^\0(?:commonjs-proxy:)?/, "").replace(root, "")
  }

  return {
    name: "rollup-plugin-bundle-stats",

    generateBundle: function (options, bundle) {
      const getDeps = (id) => {
        return this.getModuleInfo ? this.getModuleInfo(id).importedIds : []
      }

      let moduleCache = {}
      let totalSize = 0
      let totalOrigSize = 0

      // gather module info per generated chunk
      Object.entries(bundle).forEach(([outputName, assetOrChunk]) => {
        const raw =
          assetOrChunk.type === "asset"
            ? assetOrChunk.source
            : assetOrChunk.code
        const contents = getModuleContents(raw)

        moduleCache[outputName] = {
          ...calculateSizes(contents),
          dependencies: [],
          type: assetOrChunk.type,
        }

        // chunk direct deps and their deps
        const modules = assetOrChunk.modules || {}
        Object.entries(modules).forEach(([id, mod]) => {
          let moduleId = parseId(id)

          const size = sizeOrCodeSize(mod.renderedLength, mod.code)
          const origSize = sizeOrCodeSize(mod.originalLength, mod.originalCode)

          totalSize += size
          totalOrigSize += origSize

          const dependencies = getDeps(id)
          moduleCache[outputName]["dependencies"].push(
            Object.assign({}, mod, {
              id: moduleId,
              dependencies,
              size,
              origSize,
            })
          )
        })
      })

      // iterate on module list to calculate size as % of bundle, etc.

      // report results
      reportResults({ chunks: moduleCache, totalOrigSize, totalSize }, opts)
    },
  }
}

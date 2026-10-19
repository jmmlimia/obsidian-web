import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import * as ExternalPlugin from "./.quartz/plugins"

ExternalPlugin.Explorer({
  filterFn: (node) =>
    node.slugSegment !== "tags" && node.slugSegment !== "Seccion-acercade",
})

const config = await loadQuartzConfig()
export default config
export const layout = await loadQuartzLayout()

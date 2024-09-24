import DribbleChartLegend from "./DribbleChartLegend"
import DribbleChartSection from "./DribbleChartSection"
import VideosSection from "./VideosSection"

export default function MediaSection() {
  return (
    <div className="w-full">
      <DribbleChartLegend className="lg:w-1/2" />

      <div className="flex w-full flex-col gap-10 lg:flex-row">
        <DribbleChartSection />
        <VideosSection />
      </div>
    </div>
  )
}

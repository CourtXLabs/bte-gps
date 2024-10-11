import DribbleChartLegend from "./DribbleChartLegend"
import DribbleChartSection from "./DribbleChartSection"
import VideosSection from "./VideosSection"

interface Props {
  dribbleGraphImg: string
  playlistId: string
}

export default function MediaSection({ dribbleGraphImg, playlistId }: Props) {
  return (
    <div className="w-full">
      <DribbleChartLegend className="lg:w-1/2" />

      <div className="flex w-full flex-col gap-10 lg:flex-row">
        {dribbleGraphImg && <DribbleChartSection src={dribbleGraphImg} />}
        {playlistId && <VideosSection playlistId={playlistId} />}
      </div>
    </div>
  )
}

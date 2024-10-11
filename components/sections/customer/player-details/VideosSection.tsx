import YouTubePlaylist from "@/components/embeddings/YoutubePlaylist"

interface Props {
  playlistId: string
}

export default function VideosSection({ playlistId }: Props) {
  return (
    <div className="h-full flex-1">
      <YouTubePlaylist playlistId={playlistId} />
    </div>
  )
}

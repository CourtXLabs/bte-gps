interface Props {
  playlistId: string
  title?: string
}

const YouTubePlaylist = ({ playlistId, title }: Props) => {
  return (
    <div className="relative w-full pb-[53.9%]">
      <iframe
        className="absolute left-0 top-0 h-full w-full"
        src={`https://www.youtube.com/embed/videoseries?list=${playlistId}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  )
}

export default YouTubePlaylist


export function ChannelList(props){

  const CHANNEL_NAMES = ["general", "social", "random", "birds"];

  //want: an array of <li>
  const elemArray = CHANNEL_NAMES.map((channelNameString) => {
    const transformed = (
      <li key={channelNameString}>
        <a className="text-white" href={"/"+channelNameString}>{channelNameString}</a>
      </li>
    );
    return transformed

  })

  return (
    <nav className="text-white bg-secondary px-0 pe-3 py-3">
      <ul>
        {elemArray}
      </ul>
    </nav>
  )
}
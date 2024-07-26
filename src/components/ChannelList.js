import { Link } from 'react-router-dom';

export function ChannelList(props){
  const {channelNames, currentChannel} = props;

  //want: an array of <li>
  const elemArray = channelNames.map((channelNameString) => {

    let classListString = "px-2";
    if(channelNameString === currentChannel) { //on current channel
      classListString += " bg-warning";
    }

    const transformed = (
      <li className={classListString} key={channelNameString}>
        <Link className="text-white" to={"/chat/"+channelNameString}>{channelNameString}</Link>
      </li>
    );
    return transformed

  })

  return (
    <nav className="text-white bg-secondary h-100 px-0 pe-3 py-3">
      <ul className="px-0">
        {elemArray}
      </ul>
    </nav>
  )
}
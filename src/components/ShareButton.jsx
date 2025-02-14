import { useState } from 'react';
import { BsShare } from 'react-icons/bs';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from 'react-share';

const ShareButton = ({ title, id }) => {
  const [showShareOptions, setShowShareOptions] = useState(false);
  const shareUrl = `https://amazingcookbook.netlify.app/recipes/${id}`;

  return (
    <div className="relative">
      <button
        className="p-2 bg-gray-100 rounded-full shadow-md hover:shadow-lg"
        onClick={() => setShowShareOptions(!showShareOptions)}
      >
        <BsShare className="text-gray-600 text-lg" />
      </button>
      {showShareOptions && (
        <div className="absolute right-0 top-0 -translate-y-full bg-white rounded-lg p-2 flex  gap-2">
          <FacebookShareButton url={shareUrl} quote={title}>
            <FacebookIcon size={30} round={true} />
          </FacebookShareButton>

          <TwitterShareButton url={shareUrl} title={title}>
            <TwitterIcon size={30} round={true} />
          </TwitterShareButton>

          <WhatsappShareButton url={shareUrl} title={title} separator=":: ">
            <WhatsappIcon size={30} round={true} />
          </WhatsappShareButton>
        </div>
      )}
    </div>
  );
};
export default ShareButton;

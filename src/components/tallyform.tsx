interface TallyModalProps {
  isOpen: boolean;
  onClose: () => void;
  tallyUrl: string;
}

const TallyModal = ({ isOpen, onClose, tallyUrl }: TallyModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-white w-[90%] h-[90%] rounded-md shadow-lg">
        {/* Close Button */}
        {/* <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-xl"
        >
          ✖
        </button> */}
        {/* Embed Tally Form */}
        <iframe
          src={tallyUrl}
          frameBorder={0}
          marginHeight={0}
          marginWidth={0}
          title="Tally Form"
          style={{
            width: "100%",
            height: "100%",
            overflow: "auto",
          }}
          id="tallyIframe"
        ></iframe>
      </div>
    </div>
  );
};

export default TallyModal;

type Props = {};

const SectionLoader = (_props: Props) => {
  return (
    <div className="flex items-center justify-center p-8  bg-gray-100 min-w-screen">
      <div className="flex space-x-2 animate-pulse">
        <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
        <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
        <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
      </div>
    </div>
  );
};

export default SectionLoader;

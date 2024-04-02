import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/solid";

// Define the Props type for the component
type Props = {
  keyNum: number; // The key number for conditional rendering
  records: number; // The number of records to display
  desc: string; // The description of the card
};

// Define the Card component
const Card = ({ keyNum, records, desc }: Props) => {
  // Determine the color and direction of the arrow icon based on the key number and records
  const arrowColor = keyNum === 2 && records > 0 ? "text-red-500" : "text-green-500";
  const arrowIcon = keyNum === 2 && records > 0 ? <ArrowDownIcon className="h-4 w-4" /> : <ArrowUpIcon className="h-4 w-4" />;
  const percentage = keyNum === 2 && records > 0 ? "2.1%" : "14.6%"; // Example percentage

  return (
    <div className="bg-white shadow rounded-lg p-6 sm:p-6 xl:p-8">
      <div className="flex items-center">
        {/* Display the number of records and the description */}
        <div className="flex-shrink-0">
          <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
            {records}
          </span>
          <h3 className="text-base font-normal text-gray-500">{desc}</h3>
        </div>
        {/* Render the arrow icon */}
        <div className={`ml-5 w-0 flex items-center justify-end flex-1 ${arrowColor} text-base font-bold`}>
          {percentage} {arrowIcon}
        </div>
      </div>
    </div>
  );
};

// Export the Card component as the default export
export default Card;

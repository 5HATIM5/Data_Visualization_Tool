import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/solid";

// Define the Props type for the component
type Props = {
  keyNum: number;
  records: number;
  desc: string;
};

// Define the Card component
const Card = (props: Props) => {
  return (
    <div className="bg-white shadow rounded-lg p-6 sm:p-6 xl:p-8 ">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
            {props.records}
          </span>
          <h3 className="text-base font-normal text-gray-500">{props.desc}</h3>
        </div>
        {props.keyNum === 2 && props.records > 0 ? (
          <div className="ml-5 w-0 flex items-center justify-end flex-1 text-red-500 text-base font-bold">
            2.1%
            <ArrowDownIcon className="h-4 w-4" />
          </div>
        ) : (
          <div className="ml-5 w-0 flex items-center justify-end flex-1 text-green-500 text-base font-bold">
            14.6%
            <ArrowUpIcon className="h-4 w-4" />
          </div>
        )}
      </div>
    </div>
  );
};

// Export the Card component as the default export
export default Card;

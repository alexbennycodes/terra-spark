export const InfoItem = ({ title, value, className, valueClassName = "" }) => {
  return (
    <div className={`text-sm md:text-lg ${className}`}>
      <div className="flex items-center justify-between gap-10 px-4 lg:px-16 py-1">
        <h3 className="font-bold capitalize">{title}</h3>
        <div
          className={`uppercase whitespace-break-spaces text-right justify-end ${valueClassName}`}
        >
          {value}
        </div>
      </div>
    </div>
  );
};

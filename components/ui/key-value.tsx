type KeyValueProps = {
  label: string;
  value: React.ReactNode;
};

export const KeyValue = ({ label, value }: KeyValueProps) => (
  <div className="flex-between">
    <span className="font-medium">{label}:</span>&nbsp;
    <span className="text-blue-500">{value}</span>
  </div>
);

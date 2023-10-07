import { BiHeart, BiMeteor } from "react-icons/bi";

type Props = {
  handleFilterOnClick: (value: string) => void;
  activeButton: string;
};
export default function PublicPlanFilter({
  handleFilterOnClick,
  activeButton,
}: Props) {
  const orderByButtons = [
    {
      label: "Most Saved",
      icon: BiHeart,
      value: "saved",
    },
    {
      label: "New",
      icon: BiMeteor,
      value: "new",
    },
  ];

  return (
    <div>
      <div className="join mb-2">
        {orderByButtons.map(({ label, icon: Icon, value }) => (
          <button
            key={value}
            onClick={() => handleFilterOnClick(value)}
            className={`join-item btn btn-xs md:btn-sm ${
              activeButton === value && "btn-primary"
            }`}
          >
            <Icon />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

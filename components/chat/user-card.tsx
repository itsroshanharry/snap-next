import { Avatar, AvatarImage } from "../ui/avatar";

const UserCard = () => {
	return (
		<div
			className={`flex items-center gap-2 border-b border-b-sigColorBgBorder p-1 hover:bg-sigBackgroundFeedHover cursor-pointer `}
		>
			<Avatar className='cursor-pointer hover:bg-sigBackgroundSecondaryHover'>
				<AvatarImage src={"https://questhowth.ie/wp-content/uploads/2018/04/user-placeholder.png"} />
			</Avatar>
			<span>John Doe</span>
		</div>
	);
};
export default UserCard;
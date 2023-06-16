import "./Modal.css";

type Props = {
	message: string;
	onClick(): void;
};

export default function Modal({ message, onClick }: Props) {
	return (
		// This is the modal that pops up when a player wins
		<div className="modal  ">
			<div className="modal-contents">
				<p>{message}</p>
				<button onClick={onClick}>Play again</button>
			</div>
		</div>
	);
}

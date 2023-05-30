import "./Modal.css";

type Props = {
	message: string;
};

export default function Modal({ message }: Props) {
	return (
		// This is the modal that pops up when a player wins
		<div className="modal  ">
			<div className="modal-contents">
				<p>{message}</p>
				<button>Play again</button>
			</div>
		</div>
	);
}

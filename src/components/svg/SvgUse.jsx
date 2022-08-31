const SvgUse = ({ id, classe, ...props }) => {
	return (
		<>
			<svg {...props} className={classe}>
				<use xlinkHref={id}></use>
			</svg>
		</>
	);
}

export default SvgUse;
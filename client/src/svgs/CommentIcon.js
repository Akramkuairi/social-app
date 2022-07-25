export const CommentIcon = () => {
  const mode = localStorage.getItem("mode");
  let stroke;

  mode === "light" ? (stroke = "#000") : (stroke = "#fff");

  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 30"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M28,12.195c0,5.299-6.268,9.594-14,9.594c-0.16,0-0.316-0.013-0.475-0.017C8.972,26.01,2.638,25.363,2.638,25.363
		c3.275-0.674,4.743-2.488,5.287-4.535C3.239,19.277,0,16,0,12.195c0-5.298,6.268-9.594,14-9.594C21.732,2.603,28,6.897,28,12.195z"
        fill="none"
        strokeWidth="2px"
        stroke={stroke}
      />
    </svg>
  );
};

function UserInput() {
  return (
    <>
      <div className="text-white text-center mt-2 mb-2">
        <input
          className="rounded-1 border mt-2"
          type="text"
          placeholder="Enter your assigned number here"
          style={{ width: "100%", height: "35px" }}
        />
        <button
          type="button"
          className="btn btn-primary mt-3"
          style={{
            width: "100px",
            height: "50px",
          }}
        >
          Sign In
        </button>
      </div>
    </>
  );
}

export default UserInput;

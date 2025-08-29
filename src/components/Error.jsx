export default function Error({ message }) {
  return (
    <div className="error">
      <h2>An error occurred!</h2>
      <p>{message}</p>
    </div>
  );
}

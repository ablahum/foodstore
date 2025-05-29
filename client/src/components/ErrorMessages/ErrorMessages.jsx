const ErrorMessages = ({ errors }) => (
  <>
    {errors.map((error, i) => (
      <p
        key={i}
        className='text-danger fw-semibold mb-0'
      >
        {error}
      </p>
    ))}
  </>
)

export default ErrorMessages

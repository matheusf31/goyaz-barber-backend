// pegar o erro do yup e retornar um objeto de erro com todos os erros que ocorreram
export default function getValidationErrors(err) {
  const validationErrors = {};

  err.inner.forEach(error => {
    validationErrors[error.path] = error.message;
  });

  return validationErrors;
}

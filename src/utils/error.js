export function normalizeError(err) {
  return {
    message:
      err?.response?.data?.message || err?.message || 'Erreur inattendue',
    code: err?.response?.status || 500,
  };
}

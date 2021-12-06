function getSettings(req, res, next) {
  return res.json(
    {
      email: 'pedro@vertice.com.br'
    }
  );
}

module.exports = {getSettings}
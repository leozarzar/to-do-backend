const {Router} = require('express');
const PurchaseOrderController = require('../controllers/PurchaseOrderController.js');
const upload = require('../upload.js');

const router = Router();

router.get('/atlas/purchase-order', PurchaseOrderController.getAll);
router.get('/atlas/purchase-order/:id', PurchaseOrderController.getById);
router.post('/atlas/purchase-order', upload.single('image'), PurchaseOrderController.add);
router.delete('/atlas/purchase-order/:id', PurchaseOrderController.removeById);
router.delete('/atlas/purchase-order', PurchaseOrderController.removeAll);
router.patch('/atlas/purchase-order/:id', PurchaseOrderController.updateById);

module.exports = router;

/*

const uploadData = async () => {
  const formData = new FormData();

  // Adiciona atributos
  formData.append('name', 'John Doe');

  // Adiciona a imagem
  const file = document.querySelector('input[type="file"]').files[0];
  formData.append('image', file);

  try {
    const response = await fetch('http://localhost:3000/upload', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
      },
    });

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error uploading data:', error);
  }
};

*/
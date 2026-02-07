const mongoose = require('mongoose');
const Inventory = mongoose.model('Inventory');

exports.createInventory = (req, res) => {
    const newInventory = new Inventory({
        prodname: req.body.prodname,
        qty: req.body.qty,
        price: req.body.price,
        status: req.body.status
    });
    newInventory.save()
        .then(data =>
            res.status(200).json(data))
        .catch(err =>
            res.status(500).json({
                message: "Fail!",
                error: err.message
            }));
};

exports.getInventory = (req, res) => {
    Inventory.findById(req.params.id).select('-__v')
        .then(inventory => res.status(200).json(inventory))
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Inventory not found with id " + req.params.id,
                    error: err
                });
            }
            return res.status(500).send({
                message: "Error retrieving inventory with id " + req.params.id,
                error: err
            });
        });
};

exports.inventories = (req, res) => {
    Inventory.find().select('-__v')
        .then(inventories => res.status(200).json(inventories))
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: "Error retrieving inventories",
                error: err
            });
        });
};

exports.updateInventory = (req, res) => {
    Inventory.findByIdAndUpdate(req.body.id, {
        prodname: req.body.prodname,
        qty: req.body.qty,
        price: req.body.price,
        status: req.body.status
    }, { new: false })
        .select('-__v')
        .then(inventory => {
            if (!inventory) {
                return res.status(404).send({
                    message: "Error! Inventory not found with id " + req.params.id,
                    error: "Not found!"
                });
            }
            res.status(200).json(inventory);
        })
        .catch(err => {
            return res.status(500).json({
                message: "Error! Cannot update inventory with id " + req.params.id,
                error: err.message
            });
        });
};

exports.deleteInventory = (req, res) => {
    Inventory.findByIdAndRemove(req.params.id).select('-__v-_id')
        .then(inventory => {
            if (!inventory) {
                return res.status(404).send({
                    message: "Error! Inventory not found with id " + req.params.id,
                    error: "404"
                });
            }
            res.status(200).json({ message: "Inventory deleted successfully!" });
        })
        .catch(err => {
            return res.status(500).send({
                message: "Error! Cannot delete inventory with id " + req.params.id,
                error: err.message
            });
        });
};
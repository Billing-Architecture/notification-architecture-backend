const getNestedValue = (obj, path) => {
    return path.split('.').reduce((acc, key) => acc?.[key], obj);
};

const validate_empty_fields = (fields) => {
    return (req, res, next) => {
        for (const field of fields) {
            const value = getNestedValue(req.body, field);
            if (
                value === undefined ||
                value === null ||
                value === "" ||
                (Array.isArray(value) && value.length === 0)
            ) {
                return res.status(400).json({
                    message: `Field '${field}' is required.`
                });
            }
        }
        next();
    };
};

module.exports={validate_empty_fields} ;
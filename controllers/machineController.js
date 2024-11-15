let mockDatabase = [];

export const addMachineData = (req, res) => {
    const { temperature, humidity, timestamp } = req.body;
    const newData = { id: mockDatabase.length + 1, temperature, humidity, timestamp };
    mockDatabase.push(newData);
    res.status(201).json(newData);
};

export const getMachineData = (req, res) => {
    res.status(200).json(mockDatabase);
};

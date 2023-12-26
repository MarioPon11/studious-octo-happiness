import express, { Request, Response } from 'express';

interface Item {
    id: number;
    // Add other properties as needed
    // name: string;
    // price: number;
    // etc.
}

const app = express();
app.use(express.json());

let items: Item[] = [];

app.get('/items', (req: Request, res: Response) => {
    res.json(items);
});

app.post('/items', (req: Request, res: Response) => {
    const item: Item = req.body;
    items.push(item);
    res.status(201).json(item);
});

app.put('/items/:id', (req: Request, res: Response) => {
    const itemId = parseInt(req.params.id);
    const itemIndex = items.findIndex((item: Item) => item.id === itemId);

    if (itemIndex > -1) {
        items[itemIndex] = { ...items[itemIndex], ...req.body };
        res.json(items[itemIndex]);
    } else {
        res.status(404).send('Item not found');
    }
});

app.delete('/items/:id', (req: Request, res: Response) => {
    const itemId = parseInt(req.params.id);
    items = items.filter((item: Item) => item.id !== itemId);
    res.status(200).send('Item deleted');
});

const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
const { createEventByUser } = require('../../controllers');
const {createEvent} = require('../../database')
const { v4: uuidv4 } = require('uuid');
const cloudinary = require('cloudinary');

jest.mock('cloudinary');

describe('createEventByUser', () => {
  const req = {
    file: {
      path: '/path/to/image.jpg',
    },
    body: {
      name: 'Event Name',
      category: 'Event Category',
      venue: 'Event Venue',
      description: 'Event Description',
      price: 10.99,
      totalTickets: 100,
      start: '2023-06-01',
      end: '2023-06-02',
      organizer: 'Event Organizer',
    },
    params: {
      userId: 'user123',
    },
  };

  const res = {
    status: jest.fn(() => res),
    send: jest.fn(),
  };

  const form = {
    eventId: expect.any(String),
    name: req.body.name,
    category: req.body.category,
    venue: req.body.venue,
    description: req.body.description,
    amount: req.body.price,
    totalTickets: req.body.totalTickets,
    start: req.body.start,
    end: req.body.end,
    imageUrl: expect.any(String),
    organizer: req.body.organizer,
    userId: req.params.userId,
  };

  test('should create event and send response with success message', async () => {
    const expectedResponse = {
      message: 'Event created successfully',
      data: expect.anything(),
    };

    const result = { secure_url: 'https://example.com/image.jpg' };
    cloudinary.uploader.upload.mockResolvedValue(result);

    await createEventByUser(req, res);

    expect(cloudinary.uploader.upload).toHaveBeenCalledWith(req.file.path);
    expect(createEvent).toHaveBeenCalledWith(form);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith(expectedResponse);
  });

  test('should handle error and send response with error message', async () => {
    const error = new Error('Error creating event');
    createEvent.mockRejectedValue(error);

    await createEventByUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      message: 'Error creating event',
      error: error,
    });
  });
});

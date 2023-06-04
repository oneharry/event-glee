const { getAllEvents } = require('../../controllers');
const {getEvents} = require('../../database')

// Mocking the dependencies
jest.mock('../../database', () => ({
  getEvents: jest.fn().mockResolvedValue(['event1', 'event2']), // Mock the getEvents function
}));

describe('getAllEvents', () => {
  it('should return all events', async () => {
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getAllEvents(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: 'success',
      data: ['event1', 'event2'],
    });
  });
})
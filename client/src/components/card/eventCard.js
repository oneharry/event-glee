import './card.css'

export default function EventCard({event}) {

    const {name, category, start, description, venue, price, image} = event;
    return (
        <div className="home-box">
          <img
            className="evimg"
            src={image || "./images/image.png"}
          />
          <div className="inner-box">
            <div className="home-text3">{name}</div>
            <div className="home-text4">
              {description}
            </div>
            <div className="home-text5">{category}</div>
            <div className="home-text5">
              Date - {start}
            </div>
            <div className="home-text5">
              Venue - <b>{venue}</b>
            </div>
            <div className="home-text5">
              Organized by{" "}
            </div>
            <div className="home-text6">
               { (price > 0) ? `N${price}` : "Free"}
            </div>
            <div
              style={{ paddingTop: "10px" }}
              className="home-text3"
            >
              Ticket Sold:
              <span style={{ paddingLeft: "10px" }}>
                {Number(
                  String()
                ) -
                  Number(
                    String(
                      Number()
                    )
                  )}{" "}
              </span>
            </div>
          </div>
        </div>
      );
}
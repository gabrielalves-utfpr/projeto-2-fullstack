

export default function Item ({ img, title, type }) { 
  console.log(img)
    return (
        <div
        className="card card-mission"
        style={{ backgroundImage: `url("${img}")` }}
        key={img}
        >
        <div className="card-text">
          <h3>{title}</h3>
          <p>{type}</p>
        </div>
      </div>
    )
  }
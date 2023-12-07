

export default function Item ({ img, title }) { 
  console.log(img)
    return (
        <div
        className="card card-mission"
        style={{ backgroundImage: `url("${img}")` }}
        key={img}
        >
        <div className="card-text">
          <h3>{title}</h3>
          <p>Image</p>
        </div>
      </div>
    )
  }
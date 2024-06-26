function NewsItem({item}) {
    if(item.image==""){
        item.image="https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg";
    }
    return (
        <a href={item.url} className="article">
            <div className="article-image">
                <img src={item.image} alt={item.headline} />

            </div>
            <div className="article-content">
                <div className="article-source">
                    <span>{item.source}</span>
                </div>
                <div className="article-title">
                    <h2>{item.headline}</h2>
                </div>
                <p className="article-description">
                    {item.summary}
                </p>

            </div>
        </a>
    )
    }
    export default NewsItem
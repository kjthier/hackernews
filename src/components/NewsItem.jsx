export default function NewsItem({ newsItem, getDomainFromURL }) {
    
    return (
        <div key={newsItem.objectID}>
            <div>
                <a 
                className='title' 
                href={newsItem.url}
                >{newsItem.title}</a>
                <a 
                className='url' 
                href={newsItem.url}
                > ({getDomainFromURL(newsItem.url)})</a>
            </div>
            <div className='item-details'>
                <p>{newsItem.points} points</p>
                <p> by {newsItem.author}</p>
                <p>| {new Date(newsItem.created_at).toLocaleString()}</p>
                <p>| {newsItem.num_comments} comments</p>
            </div>
        </div>
    )
}
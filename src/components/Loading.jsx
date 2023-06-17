import loading from '/src/assets/spinner.gif';

export default function Loading() {
    // If news is empty (loading), display a loading message
    <div className='loading'>
        <img src={loading} alt='Loading...' />
    </div>
}
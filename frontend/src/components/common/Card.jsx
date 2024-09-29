import { Link } from 'react-router-dom';

const Card = ({ id, title, author, genre, publicationDate, available ,image }) => {
  return (
    <Link to={`/bookdetailview/${id}`} className="bg-secondary rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="p-6">
        <div className="flex items-center mb-4 h-auto">
          <div className="w-full h-full bg-secondary rounded-lg mr-4 flex-shrink-0">
            <img
              src={image ? image : 'https://cdn.kobo.com/book-images/1d595662-5d4b-441e-96cc-209125e2336f/1200/1200/False/rich-dad-poor-dad-for-teens-1.jpg'}
              alt="Book Cover"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
        <div className="flex flex-col space-y-3">
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          <div className="flex justify-between items-center">
            <span className="text-neutral">Author:</span>
            <span className="text-white font-medium">{author}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-neutral">Genre:</span>
            <span className="text-white font-medium">{genre}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-neutral">Publication Date:</span>
            <span className="text-white font-medium">
              {new Date(publicationDate).toLocaleDateString('en-GB')}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-neutral">Available:</span>
            <div
              className={`w-8 h-6 flex items-center justify-center rounded-md px-6 ${
                available ? 'bg-green-500' : 'bg-red-500'
              }`}
            >
              <span className={`font-bold text-white`}>
                {available ? 'Yes' : 'No'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;

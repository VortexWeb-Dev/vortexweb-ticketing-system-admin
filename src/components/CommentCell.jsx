import { useState } from 'react';
import { X, MessageSquarePlus, Ticket } from 'lucide-react';

const CommentCell = ({prevData, comment, onCommentUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Number of characters to show in the preview
  const previewLength = 50;
  
  // Create preview text with ellipsis if needed
  const previewText = comment?.length > previewLength 
    ? `${comment.substring(0, previewLength)}...` 
    : comment || 'No comments';
  
  const openModal = () => {
    setIsModalOpen(true);
    setNewComment('');
    setErrorMessage('');
  };

  const closeModal = () => setIsModalOpen(false);
  
  const handleSubmit = async () => {
    if (!newComment.trim()) {
      setErrorMessage('Please enter a comment');
      return;
    }
    
    setIsSubmitting(true);
    setErrorMessage('');
    
    try {
      // Current approach: Comment is a string
      const updatedComment = comment ? `${comment}\n\n${newComment}` : newComment;
      
      const response = await fetch(`https://myemirateshome.com/vortex/ticketing-system-backend/?endpoint=tickets&id=${prevData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prevData,            
          comments: updatedComment,
          // Include other required fields that need to be sent with the update
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update comment');
      }
      
      const data = await response.json();
      
      // Notify parent component about the update
      if (onCommentUpdate) {
        onCommentUpdate(data);
      }
      
      // Close modal after successful update
      closeModal();
    } catch (error) {
      console.error('Error updating comment:', error);
      setErrorMessage('Failed to update comment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  /* 
  // FUTURE IMPLEMENTATION: When comments becomes an array
  // This code should be uncommented and adapted when the backend supports array-based comments
  
  const handleSubmit = async () => {
    if (!newComment.trim()) {
      setErrorMessage('Please enter a comment');
      return;
    }
    
    setIsSubmitting(true);
    setErrorMessage('');
    
    try {
      // Create a new comment object
      const commentObj = {
        text: newComment,
        timestamp: new Date().toISOString(),
        user: "Current User", // Replace with actual user info
      };
      
      // Get existing comments or initialize empty array
      const existingComments = Array.isArray(comment) ? [...comment] : [];
      
      // Add new comment to the array
      const updatedComments = [...existingComments, commentObj];
      
      const response = await fetch('https://myemirateshome.com/vortex/ticketing-system-backend/?endpoint=tickets', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: ticketId,
          comments: updatedComments,
          // Include other required fields
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update comment');
      }
      
      const data = await response.json();
      
      // Notify parent component about the update
      if (onCommentUpdate) {
        onCommentUpdate(data);
      }
      
      closeModal();
    } catch (error) {
      console.error('Error updating comment:', error);
      setErrorMessage('Failed to update comment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Render function for array-based comments
  const renderComments = () => {
    if (!Array.isArray(comment) || comment.length === 0) {
      return <p className="text-gray-500 dark:text-gray-400 italic">No comments yet</p>;
    }
    
    return comment.map((item, index) => (
      <div key={index} className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0">
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium text-gray-800 dark:text-gray-200">{item.user}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {new Date(item.timestamp).toLocaleString()}
          </span>
        </div>
        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{item.text}</p>
      </div>
    ));
  }
  */
  
  return (
    <>
      <div className="flex items-center">
        <div className="truncate max-w-xs text-sm text-gray-700 dark:text-gray-300">
          {previewText}
        </div>
        <button
          onClick={openModal}
          className="ml-4 text-xs flex items-center py-1 px-4 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
        >
          <MessageSquarePlus size={14} className="mr-1" />
          See/Add
        </button>
      </div>
      
      {isModalOpen && (
        <div className="fixed inset-0 backdrop-blur-md bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 p-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Ticket Comments
              </h3>
              <button 
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-4 overflow-y-auto max-h-[40vh]">
              {comment ? (
                <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded mb-4">
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                    {comment}
                  </p>
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 italic mb-4">No comments yet</p>
              )}
              
              {/* For future array-based comments, replace the above with:
              <div className="mb-4">
                {renderComments()}
              </div>
              */}
            </div>
            
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                Add Comment
              </h4>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full h-24 p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                placeholder="Type your comment here..."
              />
              
              {errorMessage && (
                <p className="mt-2 text-red-500 dark:text-red-400 text-sm">
                  {errorMessage}
                </p>
              )}
              
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CommentCell;
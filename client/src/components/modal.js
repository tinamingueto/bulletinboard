import { useState } from 'react';
import Modal from 'react-modal';
import Axios from 'axios'

const ModalDelete = (props) => {

    const [isOpen, setIsOpen] = useState(false);

    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      };

    const openModal = () => {
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false)
    }

    const deleteArticle = () => {
        Axios.get(`http://localhost:5000/api/delete-article/${props.articleID}`).then((res) => {
            alert("Article successfully deleted.");
            closeModal();
        }).catch((e) => {
            console.log(e);
        });
    }

    return(
        <div>
            <button className='btn-danger' onClick={openModal}>Delete</button>
            <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <button onClick={closeModal} className='btn-white' style={{left: '80%', position: 'absolute'}}>x</button>
                <br /><br />
                <p>Are you sure you want to delete this article?</p>
                <br /><hr /><br />
                <button className='btn-danger' onClick={deleteArticle}>Yes</button>&nbsp;
                <button className='btn-white' onClick={closeModal}>No</button>
            </Modal>
        </div>
    )
}

export default ModalDelete;
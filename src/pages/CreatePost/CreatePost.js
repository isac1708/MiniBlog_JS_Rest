import styles from './CreatePost.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [body, setBody] = useState('');
    const [tags, setTags] = useState('');
    const [formError, setFormError] = useState('');
    const [isLoading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Lógica para enviar os dados do post para o backend
        setLoading(true);
        try {
            // Simulação de envio de dados
            console.log({ title, image, body, tags });
            setLoading(false);
        } catch (error) {
            setFormError('Erro ao enviar o post. Tente novamente mais tarde.');
            setLoading(false);
        }
    };

    return (
        <div className={styles.create_post}>
            <h1>Criar Post</h1>
            <p>Escreva seu post aqui!</p>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Título:</span>
                    <input
                        type="text"
                        name="title"
                        required
                        placeholder="Pense num bom título..."
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                </label>
                <label>
                    <span>Url da imagem:</span>
                    <input
                        type="text"
                        name="image"
                        required
                        placeholder="Insira uma imagem para o post..."
                        onChange={(e) => setImage(e.target.value)}
                        value={image}
                    />
                </label>
                <label>
                    <span>Conteúdo:</span>
                    <textarea
                        name="body"
                        required
                        placeholder="Escreva seu post aqui..."
                        onChange={(e) => setBody(e.target.value)}
                        value={body}
                    ></textarea>
                </label>
                <label>
                    <span>Tags:</span>
                    <input
                        type="text"
                        name="tags"
                        required
                        placeholder="Insira as tags separadas por vírgula."
                        onChange={(e) => setTags(e.target.value)}
                        value={tags}
                    />
                </label>
                <button className="btn" type="submit" disabled={isLoading}>
                    {isLoading ? 'Salvando...' : 'Cadastrar'}
                </button>
                {formError && <p className={styles.error}>{formError}</p>}
            </form>
        </div>
    );
};

export default CreatePost;
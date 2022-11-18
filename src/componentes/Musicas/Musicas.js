import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Botao, ContainerInputs, ContainerMusicas, InputMusica, Musica } from './styled'

// const musicasLocal = [{
//     artist: "Artista 1",
//     id: "1",
//     name: "Musica1",
//     url: "http://spoti4.future4.com.br/1.mp3"
// },
// {
//     artist: "Artista 2",
//     id: "2",
//     name: "Musica2",
//     url: "http://spoti4.future4.com.br/2.mp3"
// },
// {
//     artist: "Artista 3",
//     id: "3",
//     name: "Musica3",
//     url: "http://spoti4.future4.com.br/3.mp3"
// }]

export default function Musicas(props) {
    const [musicas, setMusicas] = useState([])
    const [nomeMusica, setNomeMusica] = useState("")
    const [artistaMusica, setArtistaMusica] = useState("")
    const [urlMusica, setUrlMusica] = useState("")
    

    const headers = {
        headers: {
            Authorization: "lais-macedo-ammal"
        }
    }    
    const getPlaylistTracks = () => {
        axios.get(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}/tracks`, headers)
        .then((resposta)=>{
            // console.log(resposta.data.result.tracks)
            setMusicas(resposta.data.result.tracks)
        })
        .catch((erro)=>{
            console.log(erro)
        })
    }

    const body = {
        name: nomeMusica, 
        artist: artistaMusica,
        url: urlMusica
    }
    const addTrackToPlaylist = () => {
        axios.post(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}/tracks`, body, headers)
        .then(()=>{
            // console.log(resposta)
            getPlaylistTracks()
            setNomeMusica("")
            setArtistaMusica("")
            setUrlMusica("")
        })
        .catch((erro)=>{
            console.log(erro)
        })
    }
    const removeTrackFromPlaylist = (id) => {
        axios.delete(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}/tracks/${id}`, headers)
        .then(()=>{
            // console.log(resposta)
            getPlaylistTracks()
        })
        .catch((erro)=>{
            console.log(erro)
        })
    }


    useEffect(() => {
        getPlaylistTracks()
    }, [])

    return (
        <ContainerMusicas>
            <h2>{props.playlist.name}</h2>
            {musicas.map((musica) => {
                return (
                    <Musica key={musica.id}>
                        <h3>{musica.name} - {musica.artist}</h3>
                        <audio src={musica.url} controls />
                        <button onClick={() => removeTrackFromPlaylist(musica.id)}>X</button>
                    </Musica>)
            })}
            <ContainerInputs>
                <InputMusica 
                    placeholder="artista" 
                    value={artistaMusica} 
                    onChange={(e) => setArtistaMusica(e.target.value)}
                />
                <InputMusica 
                    placeholder="musica" 
                    value={nomeMusica} 
                    onChange={(e) => setNomeMusica(e.target.value)}
                />
                <InputMusica 
                    placeholder="url"
                    value={urlMusica} 
                    onChange={(e) => setUrlMusica(e.target.value)}
                />
                <Botao onClick={addTrackToPlaylist}>Adicionar musica</Botao>
            </ContainerInputs>
        </ContainerMusicas>
    )
}


import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import * as trackService from '../services/trackService'

const TrackForm = (props) => {
    const [formData, setFormData] = useState({ title: '', artist: '' })
    const { trackId } = useParams()
    const [userIsSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name] : event.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setIsSubmitting(true);
        if(trackId) {
            await props.handleUpdateTrack(trackId, formData)
        } else {
            await props.handleAddTrack(formData)
        }
        setFormData({ title: '', artist: '' })
        setIsSubmitting(false);
    }

    useEffect(() => {
        const fetchTrack = async () => {
            const trackData = await trackService.show(trackId)
            setFormData(trackData)
        }
        if (trackId) fetchTrack()
    }, [trackId])

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="title-input">Title:</label>
            <input
              required
              type="text"
              name="title"
              id="title"
              value={formData.title}
              onChange={handleChange}
            />

            <label htmlFor="artist-input">Artist:</label>
            <input
              required
              type="text"
              name="artist"
              id="artist"
              value={formData.artist}
              onChange={handleChange}
            />

            <button type="submit">SUBMIT</button>
        </form>
    )
}

export default TrackForm;

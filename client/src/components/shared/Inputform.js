
import React from 'react'

const Inputform = ({ htmlFor, labelText, type, name, value }) => {
    return (
        <>
            <div className="mb-3">
                <label htmlFor={htmlFor} className="form-label">{labelText}</label>
                <input type={type} className="form-control"
                    name={name}
                    value={value}
                />


            </div>

        </>
    )
}

export default Inputform

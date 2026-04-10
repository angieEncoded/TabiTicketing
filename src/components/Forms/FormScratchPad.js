


                        {/* =================  ====================== */}
                        <div className="mb-3 row  align-items-center">
                            <div className="col-12 col-md-3">
                                <label className="form-label"></label>
                            </div>
                            <div className="col-12 col-md-9">
                                <input {...register('', { required: false, pattern: regexPatterns.alphaNumeric })} className={errors.street1 && dirtyFields.street1 ? 'form-control is-invalid' : 'form-control'} placeholder={"(Optional)"} />
                            </div>
                        </div>




                        {/* ================= STREET 2 ====================== */}
                        <div className="mb-3 row  align-items-center">
                            <div className="col-12 col-md-3">
                                <label className="form-label">Street Address 1</label>
                            </div>
                            <div className="col-12 col-md-9">
                                <input {...register('street1', { required: true, pattern: regexPatterns.alphaNumeric })} className={errors.street1 && dirtyFields.street1 ? 'form-control is-invalid' : 'form-control'} placeholder={"Street Address 1 (Required)"} />
                            </div>
                        </div>

                        {/* ================= STREET 1 ====================== */}
                        <div className="mb-3 row  align-items-center">
                            <div className="col-12 col-md-3">
                                <label className="form-label">Street Address 2</label>
                            </div>
                            <div className="col-12 col-md-9">
                                <input  {...register('street2', { required: false, pattern: regexPatterns.alphaNumeric })} className={errors.street2 && dirtyFields.street2 ? 'form-control is-invalid' : 'form-control'} placeholder={"Street Address 2 (Optional)"} />
                            </div>
                        </div>

                        {/* ================= CITY ====================== */}
                        <div className="mb-3 row  align-items-center">
                            <div className="col-12 col-md-3">
                                <label className="form-label">City</label>
                            </div>
                            <div className="col-12 col-md-9">
                                <input   {...register('city', { required: true, pattern: regexPatterns.alphaNumeric })} className={errors.city && dirtyFields.city ? 'form-control is-invalid' : 'form-control'} placeholder={"City (Required)"} />

                            </div>
                        </div>

                        {/* ================= COUNTYU ====================== */}
                        <div className="mb-3 row  align-items-center">
                            <div className="col-12 col-md-3">
                                <label className="form-label">County</label>
                            </div>
                            <div className="col-12 col-md-9">
                                <input   {...register('county', { required: false, pattern: regexPatterns.alphaNumeric })} className={errors.county && dirtyFields.county ? 'form-control is-invalid' : 'form-control'} placeholder={"County (Optional)"} />

                            </div>
                        </div>

                        {/* ================= STATE ====================== */}
                        <div className="mb-3 row  align-items-center">
                            <div className="col-12 col-md-3">
                                <label className="form-label">Billing Address State</label>
                            </div>
                            <div className="col-12 col-md-9">
                                <select {...register('state', { required: true, pattern: regexPatterns.alphaNumeric })} defaultValue='NJ' className={errors.state && dirtyFields.state ? 'form-select is-invalid' : 'form-select'}>
                                    {usStates.map(state => <option key={state.name} value={state.abbreviation}>{state.name}</option>)}
                                </select>
                            </div>
                        </div>

                        {/* ================= BILLING ADDRESS ZIP CODE ====================== */}
                        <div className="mb-3 row  align-items-center">
                            <div className="col-12 col-md-3">
                                <label className="form-label">Billing Address Zip</label>
                            </div>
                            <div className="col-12 col-md-9">
                                <input {...register('zip', { required: true, pattern: regexPatterns.zip })} className={errors.zip && dirtyFields.zip ? 'form-control is-invalid' : 'form-control'} placeholder={"Zip (Required)"} />
                            </div>
                        </div>

                        {/* ================= BILLING ADDRESS COUNTRY ====================== */}
                        <div className="mb-3 row  align-items-center">
                            <div className="col-12 col-md-3">
                                <label className="form-label">Billing Address Country</label>
                            </div>
                            <div className="col-12 col-md-9">
                                <select  {...register('country', { required: false, pattern: regexPatterns.alphaNumeric })} defaultValue='US' className={errors.country && dirtyFields.country ? 'form-select is-invalid' : 'form-select'}>
                                    {countries.map(country => <option key={country.name} value={country.abbreviation}>{country.name}</option>)}
                                </select>
                            </div>
                        </div>

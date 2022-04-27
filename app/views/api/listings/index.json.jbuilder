json.array! @listings.each do |listing|
    json.extract! listing, :host_id, :address, :city, :state, :zipcode, :latitude, :longitude, :check_in_date, :check_out_date, :max_num_guests, :num_beds, :num_baths, :description, :price_per_night
end
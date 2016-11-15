require 'liquid'
require 'uri'

# Removes all non alphanumeric characters
module RemoveCharacters
	def remove_characters(words)
		return words.gsub(/[^0-9a-z'’.!? ]/i, ' ').gsub(/\s+/, ' ').strip
	end
end

Liquid::Template.register_filter(RemoveCharacters)
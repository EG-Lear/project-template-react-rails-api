class StopSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :extra_stop
end

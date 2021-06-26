class LinkedList
  attr_accessor :head

  def initialize(node=nil)
    @head = node
  end

  def iterate(&block)
    current_node = @head
    callback = block
    while current_node
      callback.call(current_node)
      current_node = current_node.next_node
    end
    @head
  end

  # print each node's value on its own line
  # use your iterate method to be DRY! Don't get caught in the code rain, brrr.
  def print
    self.iterate { |node| puts node.value }
  end

  # find the node with the target value and return it
  # if not found return nil, use your iterate method to be DRY!
  def find(target)
    foundNode = nil
    self.iterate do |node|
      if node.value == target && !foundNode
        foundNode = node
      end
    end
    foundNode
  end

  # add the node to the start of the list, no nodes should be removed
  def add_first(node)
    node.next_node = @head
    @head = node
  end

  # add node to end of list, no nodes should be removed
  # you may wish to use the iterate method
  def add_last(node)
    if !@head
      self.add_first node
    else
      last_node = @head
      self.iterate do |node|
        last_node = node
      end
      last_node.next_node = node
    end
  end

  # remove the first Node in the list and update head
  # and return the removed node
  def remove_first
    if @head
      old_head = @head
      @head = @head.next_node
      old_head
    else
      nil
    end
  end

  # remove the tail node, iterate may be helpful
  # return the node you just removed
  def remove_last
    if !@head
      nil
    elsif !@head.next_node
      remove_first
    else
      penultimate_node = @head
      self.iterate do |node|
        if(node.next_node && !node.next_node.next_node)
          penultimate_node = node
        end
      end
      last = penultimate_node.next_node
      penultimate_node.next_node = nil
      last
    end
  end

  # replace the node at the given index with the given node
  def replace(idx, new_node)
    if idx == 0
      remove_first
      add_first new_node
    else
      count = 0
      self.iterate do |node|
        if count + 1 == idx
          new_node.next_node = node.next_node.next_node
          node.next_node = new_node
        end
        count += 1
      end
    end
  end

  # insert the node at the given index
  # no existing nodes should be removed or replaced
  def insert(idx, new_node)
    if idx == 0
      new_node.next_node = @head
      @head = new_node
    else
      count = 0

      self.iterate do |node|
        if count + 1 == idx
          new_node.next_node = node.next_node
          node.next_node = new_node
        end
        count += 1
      end
    end
  end

  # remove the node at the given index, and return it
  def remove(idx)
    if idx == 0
      remove_first()
    else
      old_node = nil
      count = 0
      self.iterate do |node|
        if count + 1 == idx
          old_node = node.next_node
          node.next_node = node.next_node.next_node
        end
        count += 1
      end
      old_node
    end
  end

  # removes all elements from the linked list
  def clear()
    @head = nil
  end
end

class Node
  # next is a reserved word in Ruby, so we'll use next_node instead 
  # just to keep things clear
  attr_accessor :value, :next_node

  def initialize(value=nil, node=nil)
    @value = value
    @next_node = node
  end
end

if __FILE__ == $PROGRAM_NAME
  # Don't forget to add your tests!
end

# Please add your pseudocode to this file
# And a written explanation of your solution

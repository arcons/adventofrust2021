use std::fs::File;
use std::io::BufReader;
use std::io::BufRead;

fn main() {
  // --snip--
  // let args: Vec<String> = env::args().collect();

  // let query = &args[1];
  // let filename = &args[2];

  // println!("Searching for {}", query);
  // println!("In file {}", filename);

  let contents = load_from_file("./inputs/day2input.txt");
  // let part1Answer =  part1(contents);
  // println!("Part 1 {}", part1Answer);
  let part2Answer =  part2(contents);
  println!("Part 2 {}", part2Answer);
}

#[derive(Debug)]
struct Command {
  direction: String,
  number: i32
}

fn part1(input: Vec<Command>) -> i32 {
  let mut horizontal = 0;
  let mut depth = 0;
  for com in input.iter() {
    if com.direction == "forward" {
      horizontal += com.number;
    }
    if com.direction == "up" {
      depth -= com.number;
    }
    if com.direction == "down" {
      depth += com.number;
    }
  }
  return horizontal * depth
}

fn part2(input: Vec<Command>) -> i32 {
  let mut horizontal = 0;
  let mut depth = 0;
  let mut aim = 0;
  for com in input.iter() {
    if com.direction == "forward" {
      let depthValue = aim * com.number;
      println!("aim by horiz {}", depthValue);
      horizontal += com.number;
      depth += depthValue;
    }
    if com.direction == "up" {
      aim -= com.number;
    }
    if com.direction == "down" {
      aim += com.number;
    }
  }
  println!("horiz {}", horizontal);
  println!("depth {}", depth);


  return horizontal * depth
}

fn load_from_file(file_path: &str) -> Vec<Command> {
  let file = File::open(file_path).expect("file wasn't found.");
  let reader = BufReader::new(file);

  let lines: Vec<String> = reader
      .lines()
      .map(|line| line.expect("Could not parse line"))
      .collect();

  let mut commands = Vec::new();
  for line in lines {
      let mut split = line.split_whitespace();
      let dir = split.next().unwrap();
      // println!("dir {:?}", dir);
      let num = split.next().unwrap().parse::<i32>().unwrap();
      // println!("num {:?}", num);
      let new_command = {Command {direction: dir.to_string(), number: num}};
      commands.push(new_command);
    // let com = line.split_whitespace().next().next();
  }
  // println!("Commands {:?}", commands);
  return commands;
}